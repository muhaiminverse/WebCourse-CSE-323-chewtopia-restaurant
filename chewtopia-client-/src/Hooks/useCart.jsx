// we used api , axios(axios secure), tan stack

/*
why we use tan stak

*/

// npm i @tanstack/react-query

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    // tan Stack queries
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],  // each individual user has a unique cart and items on it 
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        }
    })

    return [cart, refetch]
};

export default useCart;