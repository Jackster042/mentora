"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {getSubjectColor} from "@/lib/utils";
import { deleteCompanion } from "@/lib/actions/companion.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
    showRemoveButton?: boolean;
}

const CompanionList = ({title, companions, classNames, showRemoveButton = false}: CompanionsListProps)=> {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  
  const handleRemove = async (companionId: string) => {

    try {
      setDeletingId(companionId);
      await deleteCompanion(companionId);
      
  
      router.refresh();
    } catch (error) {
      console.error("Error deleting companion:", error);
    } finally {
      setDeletingId(null);
    }
  }
  
    return (
   <article className={cn("companion-list", classNames)}>
       <h2 className={"font-bold text-3xl"}>{title}</h2>
       <Table>
           <TableHeader>
               <TableRow>
                   <TableHead className="text-lg w-2/3">Lessons</TableHead>
                   <TableHead className="text-lg">Subject</TableHead>
                   <TableHead className="text-lg">Duration</TableHead>
                   {showRemoveButton && <TableHead className="text-lg">Actions</TableHead>}
               </TableRow>
           </TableHeader>
           <TableBody>

               {companions?.map(({id, subject, name, topic, duration}) => (
                   <TableRow key={id} >
                     <TableCell>
                         <Link href={`/companions/${id}`}>
                             <div className={"flex items-center gap-2"}>
                                <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                style={{ backgroundColor: getSubjectColor(subject) }}>
                                    <Image
                                    src={`/icons/${subject}.svg`}
                                    alt={subject}
                                    width={35}
                                    height={35}
                                    />
                                </div>
                                 <div className="flex flex-col gap-2">
                                    <p className="font-bold text-2xl">{name}</p>
                                     <p className="text-lg">{topic}</p>
                                 </div>
                             </div>
                         </Link>
                     </TableCell>
                       <TableCell>
                           <div className="subject-badge w-fit">
                               {subject}
                           </div>
                           <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                           style={{ backgroundColor: getSubjectColor(subject) }}
                           >
                               <Image
                                   src={`/icons/${subject}.svg`}
                                   alt={subject}
                                   width={18}
                                   height={18}
                               />
                           </div>
                       </TableCell>
                       <TableCell>
                           <div className="flex items-center gap-2 w-full">
                           <p className="text-2xl">{duration} {' '} <span className="max-md:hidden">mins</span></p>
                            <Image
                            src="/icons/clock.svg"
                            alt="clock icon"
                            width={14}
                            height={14}
                            className={"md:hidden"}
                            />
                           </div>
                       </TableCell>
       {showRemoveButton && (
         <TableCell>
           <div className="flex items-center gap-2 w-full">
             <button 
               onClick={() => handleRemove(id)}
               disabled={deletingId === id}
               className="w-full py-2 px-1 cursor-pointer text-sm font-bold rounded-lg bg-destructive text-white text-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-destructive/90 transition-colors"
             >
               {deletingId === id ? "Removing..." : "Remove"}
             </button>
           </div>
         </TableCell>
       )}
                   </TableRow>
               ))}
           </TableBody>
       </Table>
   </article>

    )
}
export default CompanionList
