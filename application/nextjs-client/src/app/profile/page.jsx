'use client';

import React, {Context} from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

export default function Profile() {
    const getUserInitial = (name) => {
        const names = name.split(" ");
        const initials = names.map((name) => name.charAt(0).toUpperCase());
        return initials.join("");
    };

    var User = {Name: "John Doe",
                UserName: "johndoe",
                Email: "johndoe@email.com"
    };

    const StartEdit = () => {
        console.log("Editing Profile");
    }

    return (
        <div className="bg-white">
        <NavigationBar/>
        
        <div class="flex flex-row justify-center items-center my-10">
            <div className="card p-5 w-3/4 bg-base-100 shadow-xl content-center">
                <div className="flex flex-row items-center gap-10 mb-5">
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-48">
                            <span className="text-3xl">{getUserInitial(User.Name)}</span>
                        </div>
                    </div>
                    <div className="text align-middle">
                        <div className="flex flex-col">
                            <h1 className="text-4xl font-bold">{User.Name}</h1>
                            <h2 className="text-xl">@{User.UserName}</h2>
                        </div>
                    </div>
                </div>
                <a className="btn btn-primary w-32 ml-8" onClick={StartEdit()}>Edit Profile</a>
                <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 my-5" />
                <div className="text-2xl ml-8">Details</div>
                <div className="grid grid-cols-2 gap-10 mx-8">
                    <div className="flex flex-row">
                        <div className="text-2xl mr-3">Email:</div>
                        <div className="text-2xl">{User.Email}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <card-normal>

        </card-normal>
        <Footer/>
        </div>
    );
}
