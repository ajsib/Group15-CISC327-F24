import os
import subprocess
import platform
import sys

if platform.system() == "Windows":
    import msvcrt  # Windows only
else:
    import termios
    import tty

# List of container names for each deployment option
DEV_CONTAINERS = ["front_dev_soft-qual-ass", "back_dev_soft-qual-ass", "mongo_dev_soft-qual-ass"]
PROD_CONTAINERS = ["front_prod_soft-qual-ass", "back_prod_soft-qual-ass", "mongo_prod_soft-qual-ass"]

def run_command(command, use_shell=False, capture_output=False):
    """Run a shell command and retry with sudo/admin if permission is denied."""
    try:
        result = subprocess.run(command, check=True, capture_output=capture_output, text=True, shell=use_shell)
        return result
    except subprocess.CalledProcessError as e:
        # If permission denied, retry with sudo (Linux/macOS) or instruct Windows to run as admin
        if "permission denied" in (e.stderr or "").lower():
            if platform.system() == "Windows":
                print("[ERROR] Please run the script as an administrator on Windows.")
            else:
                print("[INFO] Permission denied, retrying with sudo...")
                return subprocess.run(["sudo"] + command, check=True, capture_output=capture_output, text=True, shell=use_shell)
        else:
            raise e

def load_collection_into_mongo(container_name, collection_name, collection_file):
    """Load a single collection into MongoDB."""
    print(f"Copying {collection_file} to {container_name}...")
    run_command(["docker", "cp", collection_file, f"{container_name}:/{collection_name}.json"])

    print(f"Importing {collection_name} into MongoDB in {container_name}...")

    # Adding MongoDB authentication parameters
    run_command([
        "docker", "exec", container_name,
        "mongoimport", "--host", "mongo_dev_soft-qual-ass", "--port", "27018",
        "--db", "soft-qual-ass", "--collection", collection_name, 
        "--file", f"/{collection_name}.json", "--jsonArray",
        "--username", "root", "--password", "example", "--authenticationDatabase", "admin"
    ])
    print(f"{collection_name} imported successfully.")


def load_all_dummy_data(container_name):
    """Load all collections into MongoDB."""
    dummy_data_dir = './dummy_data/'
    collections = ['destinations', 'flights']
    
    for collection in collections:
        collection_file = os.path.join(dummy_data_dir, f"{collection}.json")
        load_collection_into_mongo(container_name, collection, collection_file)

def check_permissions():
    """Check if the user has the correct permissions to run Docker commands."""
    try:
        run_command(["docker", "ps"], capture_output=True)
    except subprocess.CalledProcessError:
        print("\n[ERROR] Docker command failed. Check if you have the right permissions.")
        sys.exit(1)

def get_all_containers():
    """Get a list of all containers (both running and stopped/exited)."""
    result = run_command(["docker", "ps", "-a", "--format", "{{.Names}}"], capture_output=True)
    return result.stdout.strip().split("\n") if result.stdout.strip() else []

def detect_current_deployment():
    """Detect the currently running deployment (Dev or Prod)."""
    all_containers = get_all_containers()
    
    # Check if all containers for DEV are present (running or stopped)
    if all(container in all_containers for container in DEV_CONTAINERS):
        return "Dev + DB"
    
    # Check if all containers for PROD are present (running or stopped)
    elif all(container in all_containers for container in PROD_CONTAINERS):
        return "Prod + DB"
    
    # Check if some containers from PROD are present
    elif any(container in all_containers for container in PROD_CONTAINERS):
        running_prod_containers = [container for container in PROD_CONTAINERS if container in all_containers]
        return f"Partial Prod running: {', '.join(running_prod_containers)}"
    
    # Check if some containers from DEV are present
    elif any(container in all_containers for container in DEV_CONTAINERS):
        running_dev_containers = [container for container in DEV_CONTAINERS if container in all_containers]
        return f"Partial Dev running: {', '.join(running_dev_containers)}"
    
    # No containers are present
    return None

def start_service(choice):
    """Start the selected service deployment."""
    if choice == '1':
        print("Starting Dev + DB...\n")
        run_command(["pnpm install" "./src"])
        run_command(["pnpm install" "./server"])
        run_command(["docker-compose", "-f", "docker-compose.dev.yml", "up", "-d", "--remove-orphans"])
        # Load the dummy data into MongoDB after starting the Dev service
        load_all_dummy_data("mongo_dev_soft-qual-ass")
    # elif choice == '2':
    #     print("Starting Prod + DB...\n")
    #     run_command(["docker-compose", "-f", "docker-compose.prod.yml", "up", "-d", "--remove-orphans"])
    #     # Load the dummy data into MongoDB after starting the Prod service
    #     load_all_dummy_data("mongo_prod")


def shutdown_service(choice):
    """Shut down all containers for the selected service deployment, including partial deployments."""
    all_containers = get_all_containers()
    
    if choice == '1':  # Dev environment
        if any(container in all_containers for container in DEV_CONTAINERS):
            print("Shutting down Dev + DB (including partial deployments)...\n")
            run_command(["docker-compose", "-f", "docker-compose.dev.yml", "down"])
        else:
            print("[INFO] No Dev containers to shut down.")
    
    # elif choice == '2':  # Prod environment
    #     if any(container in all_containers for container in PROD_CONTAINERS):
    #         print("Shutting down Prod + DB (including partial deployments)...\n")
    #         run_command(["docker-compose", "-f", "docker-compose.prod.yml", "down"])
    #     else:
    #         print("[INFO] No Prod containers to shut down.")

def view_docker_images():
    """View all Docker images available on the system."""
    print("\n[INFO] Listing all Docker images...\n")
    run_command(["docker", "images"])

def factory_reset_docker():
    """Perform a factory reset by removing all Docker containers, images, volumes, and networks."""
    print("\n[WARNING] This will remove all containers, images, volumes, and networks!\n")
    confirm = input("Are you sure you want to proceed with a factory reset? (yes/no): ")
    if confirm.lower() == 'yes':
        print("\n[INFO] Performing Docker factory reset...\n")

        # First, get the list of all container IDs
        result = run_command(["docker", "ps", "-aq"], capture_output=True)
        container_ids = result.stdout.strip().split("\n") if result.stdout.strip() else []

        if container_ids:
            # Stop all containers using the list of IDs
            run_command(["docker", "stop"] + container_ids)

        # Remove all containers, images, volumes, and networks
        run_command(["docker", "system", "prune", "-a", "--volumes", "-f"])
    else:
        print("\n[INFO] Factory reset aborted.")

def clear_terminal():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def capture_keypress():
    """Capture keypress cross-platform."""
    if platform.system() == "Windows":
        return msvcrt.getch().decode('utf-8')
    else:
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        tty.setcbreak(sys.stdin.fileno())
        try:
            return sys.stdin.read(1)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

def view_logs(choice):
    """Display logs of the currently running deployment, and allow returning to the main menu."""
    try:
        # Select the correct docker-compose logs command
        if choice == '1':
            logs_command = ["docker-compose", "-f", "docker-compose.dev.yml", "logs", "-f"]
        # elif choice == '2':
        #     logs_command = ["docker-compose", "-f", "docker-compose.prod.yml", "logs", "-f"]

        # Run the logs in a subprocess
        log_process = subprocess.Popen(logs_command)

        print("\n[INFO] Press Ctrl+C or 'q' to return to the main menu...\n")

        while True:
            key = capture_keypress()
            if key == 'q':
                log_process.terminate()
                break

    except KeyboardInterrupt:
        # Handle Ctrl+C to return to the main menu
        log_process.terminate()
    finally:
        log_process.wait()
        clear_terminal()

def main_menu():
    """Main menu for managing Docker deployments."""
    current_deployment = detect_current_deployment()
    
    print("\n====================== Docker Service Manager ======================")
    
    if current_deployment:
        print(f"\n[INFO] Currently running: {current_deployment}")
        print("\n1) View Logs")
        print("2) Stop the current deployment")
        print("3) Exit")
        option = input("\nSelect an option: ")
        
        if option == '1':
            if "Dev" in current_deployment:
                view_logs('1')
            elif "Prod" in current_deployment:
                view_logs('2')
        elif option == '2':
            if "Dev" in current_deployment:
                shutdown_service('1')
        #     elif "Prod" in current_deployment:
        #         shutdown_service('2')
        elif option == '3':
            print("Exiting...")
            exit()
        else:
            print("[ERROR] Invalid option, please try again.")
    else:
        print("\n[INFO] No services are currently running.")
        print("\n1) Start Dev + DB")
        # print("2) Start Prod + DB")
        print("3) View Docker Images")
        print("4) Docker Factory Reset")
        print("5) Exit")
        option = input("\nSelect an option: ")
        
        if option == '1':
            start_service('1')
        # elif option == '2':
        #     start_service('2')
        elif option == '3':
            view_docker_images()
        elif option == '4':
            factory_reset_docker()
        elif option == '5':
            print("Exiting...")
            exit()
        else:
            print("[ERROR] Invalid option, please try again.")

if __name__ == "__main__":
    # Initial permissions check
    check_permissions()
    
    while True:
        main_menu()
        print("\nPress Enter to return to the main menu...")
        input()
