import { useState } from 'react';
//import { createPost } from '../../services/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUIStore, useUserStore } from '../../store';
import { createPost } from '../../api';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { LoadingIcon } from '..';

type Inputs = {
    content: string;
};

interface Props {
    typePost: string;
}

export const Modal = ({ typePost }: Props) => {

    const [selectedFile, setSelectedFile] = useState<any>();
    const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
    const { isSideModalPost, closeModalPost } = useUIStore(state => state);
    const user = useUserStore(state => state.user);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("content", data.content);

        if (selectedFile) {
            const { ok } = await createPost(user.token!, formData);
            if (!ok) return;

            resetField('content');
            setSelectedFile("");
            closeModalPost();
        } else {
            const { ok } = await createPost(user.token!, { content: data.content });
            if (!ok) return;

            resetField('content');
            setSelectedFile("");
            closeModalPost();
        }

    }

    const handleFileSelect = (event: any) => setSelectedFile(event.target.files[0]);

    return (
        <div className={`${isSideModalPost ? 'fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full transition-all' : 'hidden'}`}>
            <div className="border border-blue-500 modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between pb-3">
                            <div className=" cursor-pointer z-50" onClick={closeModalPost}>
                                <IoCloseCircleOutline size={30} />
                            </div>
                            <p className="text-2xl font-bold text-gray-500">Post</p>
                            <div>
                                <button
                                    type="submit"
                                    className="px-4 bg-black p-2 ml-3 rounded-full text-white hover:bg-teal-400"
                                >{isSideModalPost ? 'Save' : <LoadingIcon />}</button>
                            </div>
                        </div>
                        
                        <div className="w-full">
                          

                                <div className="">
                                    <label className="text-md text-gray-600">Content</label>
                                    <textarea
                                        {...register("content", { minLength: 10, maxLength: 150 })}
                                        name="content"
                                        className="p-6 w-full border-2 border-gray-300 mb-5 rounded-md" /
                                    >
                                    {errors.content?.type === 'minLength' && <span style={{ color: "red" }}>;inimum 10 letters</span>}
                                    {errors.content?.type === 'maxLength' && <span style={{ color: "red" }}>Maximun 150 letters</span>}
                                </div>

                                <div className="max-w-2xl mx-auto mt-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Image</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file"
                                        name="img"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
