import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface Achievement {
    id: number;
    title: string;
    date: Date;
    category: string;
    level: string;
    certificate: string[];
    description: string | null;
    createdby: number | null;
}

interface Student {
    id: number;
    name: string;
    class: string;
    mykad: string;
    achievementstudents: { achievementdata: Achievement }[];
}

interface ViewStudentDetailsProps {
    studentData: Student;
}

export function ViewStudentDetails({ studentData }: ViewStudentDetailsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-purple-400' ><Eye color='white' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>About {studentData.name}</DialogTitle>
                    <DialogDescription>
                        {studentData.class} - {studentData.mykad}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4">Achievements</h2>
                    <ul>
                        {studentData.achievementstudents.map(({ achievementdata }, index) => (
                            <li key={index} className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{achievementdata.title}</h3>
                                <p className="text-sm text-gray-600"><strong>Level:</strong> {achievementdata.level}</p>
                                <p className="text-sm text-gray-600"><strong>Category:</strong> {achievementdata.category}</p>
                                <p className="text-sm text-gray-600">{achievementdata.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
