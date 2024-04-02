import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurant = async (): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Get restaurant failed");

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "myRestaurant",
    getMyRestaurant
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurant = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      body: restaurantFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Create restaurant failed");

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurant);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurant = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      body: restaurantFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Create restaurant failed");

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurant);

  if (isSuccess) {
    toast.success("Restaurant updated!");
  }
  if (error) {
    toast.error("Unable to create restaurant");
  }

  return { updateRestaurant, isLoading };
};
