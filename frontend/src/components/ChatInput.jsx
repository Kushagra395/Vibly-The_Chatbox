import React, { useRef, useState } from 'react'
import { useStore } from '../Store/UseChatStore(zustand)';
import { Image, Send, X } from 'lucide-react';
import toast from "react-hot-toast";


const ChatInput = () => {
    const [text,setText]= useState("")
    const [imagepreview, setimagepreview] = useState(null);
    const fileinputref = useRef(null);
    const {sendMessage} = useStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setimagepreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
    
      const removeImage = () => {
        setimagepreview(null);
        if (fileinputref.current) fileinputref.current.value = "";
      };
    
      const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagepreview) return;
    
        try {
          await sendMessage({
            text: text.trim(),
            image: imagepreview,
          });
    
          // Clear form
          setText("");
          setimagepreview(null);
          if (fileinputref.current) fileinputref.current.value = "";
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      };
    
  return (
    <div className="p-4 w-full">
        {imagepreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagepreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

<form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden" //hiddlen isliye chose ur folder bht khrb dikhta tha usse jagah image daal diya par kaam yahi karega
            ref={fileinputref}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagepreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileinputref.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagepreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>


  )
}

export default ChatInput
