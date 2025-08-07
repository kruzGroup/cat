"use client"

import { useState, useEffect } from "react"
import { router, usePage } from "@inertiajs/react"
import { type PageProps } from "@inertiajs/core"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eraser, Loader2 } from "lucide-react"

interface User {
  id: number
  full_name: string
}

interface ToastData {
  type: "success" | "error" | "info" | "warning"
  message: string
}


interface AppButtonDeleteProps {
  user: User
  route?: string
}

export default function AppButtonDelete({ user, route: deleteRoute = "users.destroy" }: AppButtonDeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { props } = usePage<any>();

  // Manejo de toasts
  useEffect(() => {
    if (props.toast) {
      const { type, message } = props.toast;
      if (type === "success") {
        toast.success(message, {
          duration: 4000,
          position: "top-right",
        });
      } else if (type === "error") {
        toast.error(message, {
          duration: 5000,
          position: "top-right",
        });
      } else {
        toast(message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }, [props.toast]);

  const handleDelete = (userId: number) => {
    setIsDeleting(true);

    // Construir la URL de eliminación
    const deleteUrl = deleteRoute.includes(".") ? route(deleteRoute, { id: userId }) : `${deleteRoute}/${userId}`;

    router.delete(deleteUrl, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleting(false);
        // El mensaje toast se manejará automáticamente por el useEffect
      },
      onError: (errors) => {
        console.error("Error al eliminar:", errors);
        setIsDeleting(false);
        // El mensaje toast de error se manejará automáticamente por el useEffect
      }
    });
  };

  return (
    <TooltipProvider>
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-8 hover:border-red-500 hover:text-red-500 bg-transparent transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Eraser className="size-4" />}
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar usuario</p>
          </TooltipContent>
        </Tooltip>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este usuario?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              ¿Estás seguro de que quieres eliminar a: <strong>{user.full_name}</strong>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(user.id)}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 transition-colors"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}
