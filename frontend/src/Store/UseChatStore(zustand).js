import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { UseAuthStore } from './UseAuthStore(zustand)'


export const useStore = create((set,get) => ({
     user:[],
    message :[],
    UserSelected :null,
    isUserloading:false,
    isMesssageloading:false,
    onlineUsers:[],

    getUser : async () => {
        set({isUserloading:true})
        try {
            const response = await axiosInstance.get('/message/users')
            
            set({user:response.data, isUserloading:false}) //user mai  saare log aa jaenge leaving jo logging kiya esa backend mai hamne pehle hi set kiya hai
            console.log(response.data)
            }
        catch (error)
         {
                console.log(error)
                toast.error('Error fetching user data')
                set({isUserloading:false})
         }
  },


  getMessages :async (userId) => {
    set({isMesssageloading:true})
    try {
        const response = await axiosInstance.get(`/message/${userId}`)
        set({message:response.data, isMesssageloading:false})
        }
        catch (error)
        {
            console.log(error)
            toast.error('Error fetching message data')
            set({isMesssageloading:false})
            }
   },

   sendMessage: async (messagedata) => {
    set({ isMesssageloading: true });
    const { UserSelected, message } = get();
  
    try {
      if (!messagedata.image) {
        messagedata.image = '';
      }
      const response = await axiosInstance.post(`/message/send/${UserSelected._id}`, messagedata);
  
      const existingMessage = message.find((msg) => msg._id === response.data._id);
      if (!existingMessage) {
        set({ message: [...message, response.data], isMesssageloading: false });
      } else {
        set({ isMesssageloading: false });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error sending message');
      toast.error('Choose smaller file');
      set({ isMesssageloading: false });
    }
  },
  Subscibetomessage : async () => {
    const {UserSelected} = get()
    const authUser = UseAuthStore.getState().authUser
    if(!UserSelected) return
    const socket = UseAuthStore.getState().socket
  
    socket.on( 'newmessage', (newmessage) => {
      console.log('Received new message:', newmessage)
      console.log('Sender ID:', newmessage.senderId)
      console.log('Receiver ID:', newmessage.recieverId)
      console.log('Auth User ID:', authUser._id)
      console.log('Selected User ID:', UserSelected._id)
  
      if(newmessage.senderId=== authUser._id && newmessage.recieverId === UserSelected._id) {
        console.log('Skipping message as it is sent by self')
        return
      }
      set({message:[...get().message,newmessage]})
    })
  },

   unsubscribeFromMessages: () => {
    const socket = UseAuthStore.getState().socket;
    socket.off("newmessage");
  },

   setSelectedUser : async (selectedUser) => {
    set({UserSelected:selectedUser})
    },

            

      }))
    
  




