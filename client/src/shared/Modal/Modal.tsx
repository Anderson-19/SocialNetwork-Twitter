import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { createPost } from '../../services/actions';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    showModal: boolean;
}

type Inputs = {
    content: string;
};

export const Modal = ({ showModal = false }: Props) => {

    const [selectedFile, setSelectedFile] = useState<any>();
    const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
    const { setShowModal, user } = useStore((state) => state);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        formData.append("content", data.content);

        const { ok } = await createPost({ content: data.content }, user.token!, formData);
        if (ok) {
            resetField('content');
            setSelectedFile("");
            setShowModal(false);
        }
    }

    const handleFileSelect = (event: any) => setSelectedFile(event.target.files[0]);

    return (
        <div className={`${showModal ? 'fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full transition-all' : 'hidden'}`}>
            <div className="border border-blue-500 modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    {/* <!--Title--> */}
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold text-gray-500">Create Post</p>
                        <div className="modal-close cursor-pointer z-50" onClick={() => setShowModal(false)}>
                            <svg className="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    {/* <!--Body--> */}
                    <div className="my-5 mr-5 ml-5 flex justify-center">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="">

                                <div className="max-w-2xl mx-auto mt-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Upload Image</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file"
                                        name="img"
                                        onChange={handleFileSelect}
                                    />
                                </div>

                                <div className="mt-12">
                                    <label className="text-md text-gray-600">Content</label>
                                    <textarea
                                        {...register("content", { minLength: 10, maxLength: 150 })}
                                        name="content"
                                        className="p-6 w-full border-2 border-gray-300 mb-5 rounded-md" /
                                    >
                                    {errors.content?.type === 'minLength' && <span style={{ color: "red" }}>;inimum 10 letters</span>}
                                    {errors.content?.type === 'maxLength' && <span style={{ color: "red" }}>Maximun 150 letters</span>}
                                </div>

                            </div>
                            {/* <!--Footer--> */}
                            <div className="flex justify-end pt-2 space-x-14">
                                <button
                                    className="px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold" onClick={() => setShowModal(false)}>Cancel</button>
                                <button
                                    type="submit"
                                    className="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
