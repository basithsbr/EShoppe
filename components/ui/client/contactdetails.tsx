import { Input } from "@base-ui/react";
import { Search } from "lucide-react";


export default function ContactDetails() {

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bluefamily-def-H2 font-semibold">Contact Details</h1>
            <div className="flex flex-col lg:flex-row  gap-5 w-full">
                <div className="flex flex-col gap-5 shadow-border-def flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            Address1
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            Address2
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            District
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            City
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            State
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                </div>

                <div className="flex flex-col gap-5 shadow-border-def flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            Mobile1
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            Mobile2
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            LandLine
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H2">
                            Email
                        </span>
                        <Input type="text" 
                            className="border-b input-focus-border-h-def" />
                    </div>

                </div>
            </div>
        </div>
    );
}