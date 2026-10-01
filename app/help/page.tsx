import WhatsAppIcon from "@/components/ui/icons/WhatsappIcon";
import { MailIcon, MailPlusIcon, PhoneCallIcon } from "lucide-react";


export default function HelpPage() {
    return (
        <>
            <div className=" bg-slate-50 flex justify-center p-3 sm:p-6 lg:p-8">
                <div className="w-4xl bg-white rounded-2xl shadow-xl overflow-hidden  border border-slate-100 p-5 pb-20">
                    <div className="flex flex-col gap-5 px-3 py-3">
                        <div className="font-bluefamily-def-H14 font-bold flex flex-col gap-3">
                            <span>Customer Support</span>
                            <hr></hr>
                        </div>
                        
                        <span className="font-bluefamily-def-H12">
                            For any queries, Please reach out us @&nbsp;
                            
                            <span className="font-bluefamily-def-H14"> 
                                <MailIcon className="inline h-5"></MailIcon> 
                                <span className="font-bluefamily-def-H14"> test@gmail.com</span></span>
                        </span>
                        <span>
                            (OR)
                        </span>
                        <span className="font-bluefamily-def-H12 flex flex-row gap-2">
                            Contact us on
                            <PhoneCallIcon></PhoneCallIcon>
                            <span className="font-bluefamily-def-H14 font-semibold"> 12345667</span>
                        </span>
                        <span>
                            (OR)
                        </span>
                        <span className="font-bluefamily-def-H12 flex flex-row gap-1">
                            
                            <a
                                href="https://wa.me/+97474766890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#25D366] hover:text-[#20ba5a] transition-colors"
                            >
                                <WhatsAppIcon size={32} />
                            </a>
                            <a
                                href="https://wa.me/+97474766890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bluefamily-def-H14 hover:text-[#20ba5a] transition-colors flex items-center"
                            >
                                (+974) 74766890
                            </a>
                            
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

}