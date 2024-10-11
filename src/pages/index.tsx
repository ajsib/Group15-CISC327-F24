/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';

interface Member {
  name: string;
  linkedin: string;
}

interface HomeProps {
  welcomeMessage: string;
  projectTitle: string;
  projectDescription: string;
  members: Member[];
}

// Consolidated styles using a single `css` template literal
const pageStyles = css`
  margin: 20px;

  .container {
    max-width: 800px;
    margin: auto;
  }

  h1,
  h2,
  h3 {
    margin-bottom: 10px;
  }

  .welcome-message {
    margin-bottom: 20px;
  }

  .project-description {
    margin-bottom: 30px;
  }

  .profile-card {
    border: 1px solid #000;
    padding: 20px;
    margin-bottom: 15px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    h3 {
      margin: 0;
    }
  }
`;

const Home = ({ welcomeMessage, projectTitle, projectDescription, members }: HomeProps) => {
  return (
    <div css={pageStyles}>
      <div className="container">
        <h1>{welcomeMessage}</h1>
        <p className="welcome-message">We are Group 15, and this is our project for CISC 327 in the Fall of 2024.</p>

        <div className="project-description">
          <h2>{projectTitle}</h2>
          <p>{projectDescription}</p>
        </div>

        <h2>Group Members</h2>

        {members.map((member, index) => (
          <div
            key={index}
            className="profile-card"
            onClick={() => window.location.href = member.linkedin}
          >
            <h3>{member.name}</h3>
            <p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                View LinkedIn Profile
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Fetch data from Flask API during SSR
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://127.0.0.1:5000/api/welcome');
  const data = await res.json();

  return {
    props: {
      welcomeMessage: data.welcomeMessage,
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      members: data.members,
    },
  };
};

export default Home;
