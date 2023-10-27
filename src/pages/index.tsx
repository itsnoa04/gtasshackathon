import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/utils/api";
import logo from "~/assets/logo.png";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute left-0 top-0 p-10">
          <Image src={logo} height={100} width={100} alt="" />
        </div>
        <TaskTeamTable />
      </main>
    </>
  );
}

const TaskTeamTable = () => {
  return (
    <div className=" flex w-[70vw] flex-col gap-5 ">
      <div className="rounded-2xl bg-slate-500">
        <TeamTaskCard />
        <TeamTaskCard />
      </div>
      <div className="flex justify-center gap-5 ">
        <AddTask />
        <Button className="bg-slate-600">Add New User</Button>
      </div>
    </div>
  );
};

const taskFormSchema = z.object({
  taskName: z.string(),
  taskDescription: z.string(),
  taskSkill: z.string(),
});

const AddTask = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-slate-600">Add New Task</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Task</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>AddTask</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AddTaskForm = () => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskSkill: "",
    },
  });
};

const TeamTaskCard = () => {
  return (
    <div className="flex">
      <UserCard />
      <div className="m-0 flex w-full overflow-x-auto ">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
};

const UserCard = () => {
  return (
    <div className=" m-2 flex flex-col items-center justify-center rounded-xl bg-slate-300 p-5">
      <Image src={logo} height={100} width={100} alt="" />
      <h2>John Doe</h2>
    </div>
  );
};

const TaskCard = () => {
  return (
    <div className="mx-2.5 my-5 flex w-[10vw] min-w-[10vw] flex-col items-start gap-5 rounded-xl bg-white p-5">
      <h2 className="text-xl font-bold">Task Name</h2>
      <p className="text-md font-normal">
        lorem ipsum lorem ipsum lorem ipsumlorem ipsum
      </p>
    </div>
  );
};
