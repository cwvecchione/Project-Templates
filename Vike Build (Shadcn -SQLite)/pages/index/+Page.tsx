import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = data;
      setEmployees(updated);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, data]);
    }
    reset();
  };

  const handleEdit = (index) => {
    reset(employees[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  return (
    <div className="p-8 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Employee Manager</h1>

      {/* Add/Edit Employee Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>{editingIndex !== null ? "Edit Employee" : "Add Employee"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription>
              Fill in the employee details below.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("name", { required: true })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                className="col-span-3"
                {...register("position", { required: true })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Input
                id="level"
                className="col-span-3"
                {...register("level", { required: true })}
              />
            </div>

            <Button type="submit" className="mt-2">
              {editingIndex !== null ? "Update" : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Employee Table */}
      <Table>
        <TableCaption>A list of company employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No employees yet.
              </TableCell>
            </TableRow>
          )}
          {employees.map((emp, index) => (
            <TableRow key={index}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.level}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
