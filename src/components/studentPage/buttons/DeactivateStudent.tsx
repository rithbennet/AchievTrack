import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundX } from "lucide-react";
import { deactivateStudent } from "@/actions/manageStudentAction";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    studentid: number;
}


export function StudentDeactiveButton(studentId: DeleteButtonProps) {
    const router = useRouter();

    const handleDeactivate = async () => {
        await deactivateStudent(studentId.studentid);
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-red-500' variant="outline"><UserRoundX color='white' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Deactive Student</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    Are you sure you want to deactivate this student?
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className='bg-red-500' onClick={handleDeactivate} >
                            Deactivate
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
