import { Input } from "@base-ui/react";
import { Search } from "lucide-react";


export default function ContactDetails() {
    
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bluefamily-def-H2 font-semibold">Contact Details</h1>
            
            <div className="flex flex-col lg:flex-row  gap-5 w-full">
                <div className="flex flex-col gap-5 shadow-border-def flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Address1
                        </span>
                        <Input type="text" required name="address1"                            
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your address!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} 
                            />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Address2
                        </span>
                        <Input type="text" name="address2"
                            className="border-b input-focus-border-h-def"
                             />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            LandMark
                        </span>
                        <Input type="text" required name="landMark"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Landmark would be helpful!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Zip Code
                        </span>
                        <Input type="number" required name="zip"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your Zip code!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                </div>

                <div className="flex flex-col gap-5 shadow-border-def flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            District
                        </span>
                        <Input type="text" required name="district"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your District!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            City
                        </span>
                        <Input type="text" required name="city"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your city!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            State
                        </span>
                        <Input type="text" required name="state"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your State!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                </div>
                <div className="flex flex-col gap-5 shadow-border-def flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Mobile1
                        </span>
                        <Input type="number" required name="mobile1"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Mobile number is needed!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Mobile2
                        </span>
                        <Input type="number" name="mobile2"
                            className="border-b input-focus-border-h-def"  />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            LandLine
                        </span>
                        <Input type="number" name="landline"
                            className="border-b input-focus-border-h-def" 
                            />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bluefamily-def-H3">
                            Email
                        </span>
                        <Input type="text" required name="email"
                            className="border-b input-focus-border-h-def" 
                            onInvalid={(e) => e.currentTarget.setCustomValidity('Email is needed!')}
                            onInput={(e) => e.currentTarget.setCustomValidity('')} />
                    </div>

                </div>
            </div>
            
        </div>
    );
}