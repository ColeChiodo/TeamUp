// AboutJaycee.js

import React from 'react';
import TeamMember from '../components/TeamMember/TeamMember';
import JayceeImage from '../images/MemberPics/Jaycee.png';

const AboutJaycee = () => (
  <TeamMember
    name="Jaycee Lorenzeo"
    image={JayceeImage}
    bio="Hey! I'm Jaycee, the team's Front-end Lead. I'm a senior Computer Science major at 
        San Francisco State University. I love climbing and playing pool! I'm a also a huge fan of basketball and the 
        New York Knicks."
    githubUsername="jclorenz0"
  />
);

export default AboutJaycee;
