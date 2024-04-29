import { Link, useParams } from 'react-router-dom';
import '../styles/Member.css';

const members = [
    {
        id: "martin",
        name: "Martin Pham",
        pfp: "/images/Martin.png",
        github: "mar10fam",
        description: "Hello everyone! I'm Martin, the Github Master for the team. I love playing sports and I'm translating that love into our incredible app TeamUp! If I'm not working, you can find me in the mountains either out on a hike or camping. On more laid back days, I'll be cozied up at home watching shows. "
    },
    {
        id: "kotaro",
        name: "Kotaro Iwanaga",
        pfp: "/images/Kotaro.png",
        github: "iamjotaaax",
        description: "Hello! My name is Kotaro Iwanaga. I am the database admin for the team. I love to watch soccer and my favorite team is Real Madrid. What is your favorite team? If you like to play soccer, join us on TeamUp and let's play soccer together!"
    },
    {
        id: "juan",
        name: "Juan Estrada",
        pfp: "/images/Juan.png",
        github: "jjestrada2",
        description: "Hey there! I am the Team Lead, My name is Juan Estrada, but most folks just call me Juanito. I'm a computer science student from Colombia 🇨🇴, currently studying at San Francisco State University. Go Gators!🐊 You'll often find me at hackathons, meetups, and conferences, geeking out with fellow tech enthusiasts and keeping up with the latest trends."
    },
    {
        id: "jaycee",
        name: "Jaycee Lorenzo",
        pfp: "/images/Jaycee.png",
        github: "jclorenz0",
        description: "Hey! I'm Jaycee, the team's Front-end Lead. I'm a senior Computer Science major at San Francisco State University. I love climbing and playing pool! I'm a also a huge fan of basketball and the New York Knicks."
    },
    {
        id: "cole",
        name: "Cole Chiodo",
        pfp: "/images/Cole.png",
        github: "colechiodo",
        description: "Hi! I'm Cole. I am a senior Computer Science Major at San Francisco State University. I like to play video games, play my bass guitar, and follow the Giants during the baseball season. I am the Docs Editor for the team."
    },
    {
        id: "areeb",
        name: "Areeb Abbasi",
        pfp: "/images/areeb.png",
        github: "areeeeb",
        description: "Hello. I'm Areeb. I'm a grad student at San Francisco State University. I'm passionate about software development and I'm excited to be working on the backend of the project. I'm also a big soccer fan (Visca Barca!) and I love to play FIFA in my free time."
    }
]

export default function AboutMember() {
    const { member } = useParams();
    const selectedMember = members.find(mem => mem.id === member);

    if(!selectedMember) {
        return (
            <div>Member not found!</div>
        );
    }

    return (
        <>
        <div className="about-header">
            <Link to="/about">
                <div className="back-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
            </Link>
            <h1 className='title'>About {selectedMember.name}</h1>
        </div>
        <div className="about-me-description-container">
            <div className="about-me-image-container">
                <img className="about-me-image"
                    src={selectedMember.pfp} alt='placeholder' />
                <p>Github: {selectedMember.github}</p>
            </div>
            <p className="about-me-description">{selectedMember.description}</p>
        </div>
        </>
    )
}

