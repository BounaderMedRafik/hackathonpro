"use client";
import supabase from "@/app/supabase/supaClient";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventsAvailable, statusAvilable } from "@/data/frontData";
import { useCheckAdminEmail } from "@/hooks/useCheckAdminEmail";
import { useFetchAdmins } from "@/hooks/useFetchAdmins";
import useUploadThumbnail from "@/hooks/useUploadImage";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AdminPageContent = () => {
  const { isLoaded, user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;
  const { isAdmin, loading, error } = useCheckAdminEmail(email);
  const { admins, loading: adminsLoading } = useFetchAdmins();

  const [product_code, setProduct_code] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const selectedAdmin = admins.find((admin) => admin.name === location);
  const SendProduct = async () => {
    const { error } = await supabase.from("products").insert({
      product_code: product_code,
      name: name,
      brand: brand,
      description: description,
      ingredients: ingredients,
      image: thumbnailUrl,
      senderid: user?.emailAddresses[0].emailAddress,
      sendto: selectedAdmin?.email,
    });

    if (!error) {
      toast.success("Uploaded succesfully");
    }
  };

  const SendTrace = async () => {
    const {} = await supabase.from("traceability_events").insert({
      product_code: product_code,
      event_date: eventDate,
      event: event,
      location: location,
      status: status,
    });
  };

  const HandleSubmit = async () => {
    await SendProduct();
    await SendTrace();
  };

  const {
    thumbnailUrl,
    isLoading: uploading,
    uploadThumbnail,
    clearThumbnail,
  } = useUploadThumbnail();

  console.log(thumbnailUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user?.id) {
      await uploadThumbnail(file, user.id);
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-svh flex items-center justify-center text-sm -mt-24">
        Checking admin status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-svh flex items-center justify-center text-sm -mt-24 text-red-500">
        Something went wrong: {error.message}
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full h-svh flex items-center justify-center text-sm -mt-24">
        ❌ You are not an admin.
      </div>
    );
  }

  return (
    <div className="w-full min-h-svh wrapper">
      <div className="text-2xl">Welcome {user?.fullName}</div>
      <div className="opacity-75 text-sm max-w-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum magnam
        fugiat dolorum nulla blanditiis
      </div>

      <div className="md:grid flex flex-col grid-cols-6 mt-5 gap-4">
        <div className="col-span-2">
          {thumbnailUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={thumbnailUrl}
                alt="Uploaded Thumbnail"
                className="w-48 h-48 object-cover rounded-lg shadow"
              />
              <button
                onClick={clearThumbnail}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Remove Thumbnail
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
          {uploading && (
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Uploading...
            </div>
          )}
        </div>

        <div className="col-span-4 p-5 space-y-4">
          <Input
            placeholder="Product Code"
            value={product_code}
            onChange={(e) => setProduct_code(e.target.value)}
          />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <label className="text-sm font-medium">Ingredients</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <Button type="button" onClick={addIngredient}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ul className="mt-2 space-y-1">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-3 py-1 bg-muted rounded text-sm"
                >
                  {item}
                  <button onClick={() => removeIngredient(index)}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button variant={"secondary"} className=" w-full ">
                    {location ? location : "Select Location"}
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {admins.map((item, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => {
                      if (item?.name) {
                        setLocation(item.name);
                      }
                    }}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button variant={"secondary"} className=" w-full ">
                    {event ? event : "Select event"}
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {eventsAvailable.map((ev) => (
                  <DropdownMenuItem
                    key={ev}
                    onClick={() => {
                      setEvent(ev);
                    }}
                  >
                    {ev}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button variant={"secondary"} className=" w-full ">
                    {status ? status : "Select Status"}
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusAvilable.map((st) => (
                  <DropdownMenuItem
                    key={st}
                    onClick={() => {
                      setStatus(st);
                    }}
                  >
                    {st}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Optional: Add submit/save button here */}
          <div className="w-full flex items-center justify-end">
            <Button
              onClick={HandleSubmit}
              variant={"default"}
              className=" mr-0 "
            >
              <div className=" spread">
                Submit
                <ArrowRight size={12} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageContent;
