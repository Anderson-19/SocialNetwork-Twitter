
import { type User } from '../../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { editUser } from '../../services/actions';
import { LoadingIcon } from '../../shared';
import { IoCloseCircleOutline, IoCameraSharp } from 'react-icons/io5';
import { useUIStore, useUserStore } from '../../store';
import { changeAvatarUser, changeBannerUser, editUser } from '../../api';
import { useState } from 'react';
import { ModalImage } from '.';

interface Props {
    userData: User,
    state: any;
}

type Inputs = {
    name: string,
    lastname: string,
    biography: string,
    location: string,
    birthdate: string;
    banner: any;
    avatar: any;
};

export const ModalUser = ({ userData }: Props) => {

    const { user, setUser } = useUserStore(state => state);
    const { isSideModalEditUser, closeModalEditUser, isSideModalUserImage } = useUIStore(state => state);
    const [typeChange, setTypeChange] = useState<string>('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();


        if (data.avatar[0] && data.banner[0] && data) {
            formData.append("banner", data.banner[0]);
            formData.append("avatar", data.avatar[0]);
            const { avatar } = await changeAvatarUser(user, formData);
            const { banner } = await changeBannerUser(userData, user.token!, formData);
            const { ok } = await editUser({ uid: userData.uid, token: user.token, ...data });
            if (ok) {
                closeModalEditUser();
                setUser({ ...user, avatar, banner, name: data.name, lastname: data.lastname });
                reset(data);
            }
        } else if (data.avatar[0]) {
            formData.append("avatar", data.avatar[0]);
            const { ok, avatar } = await changeAvatarUser(user, formData);
            if (ok) {
                closeModalEditUser();
                setUser({ ...user, avatar });
                reset(data);
            }
        } else if (data.banner[0]) {
            formData.append("banner", data.banner[0]);
            const { ok, banner } = await changeBannerUser(userData, user.token!, formData);
            if (ok) {
                closeModalEditUser();
                setUser({ ...user, banner });
                reset(data);
            }
        } else {
            const { ok } = await editUser({ uid: userData.uid, token: user.token, ...data });
            if (ok) {
                closeModalEditUser();
                setUser({ ...user, name: data.name, lastname: data.lastname });
                reset(data);
            }
        }

    }

    const fixBirthdate = (birthdate: string): string => {
        const date = new Date(birthdate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day.toString()}-${month.toString()}-${year.toString()}`;
    }


    return (
        <div className={`${isSideModalEditUser ? 'fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full transition-all' : 'hidden'}`}>
            <div className="border border-blue-500 modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    {/* <!--Title--> */}

                    {/* /** EDICION DE IMAGENES  */}
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between pb-3">
                            <div className=" cursor-pointer z-50" onClick={closeModalEditUser}>
                                <IoCloseCircleOutline size={30} />
                            </div>
                            <p className="text-2xl font-bold text-gray-500">Profile</p>
                            <div>
                                <button
                                    type="submit"
                                    className="px-4 bg-black p-2 ml-3 rounded-full text-white hover:bg-teal-400"
                                >{isSideModalEditUser ? 'Save' : <LoadingIcon />}</button>
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-full flex justify-center items-center bg-cover bg-no-repeat bg-center cursor-pointer opacity-80 " style={{ height: '200px', backgroundImage: `url(${userData?.banner})` }}>
                                    <IoCameraSharp size={50} className="text-black " fontSize="large" />
                                    <input id="upload" type="file" className="hidden" {...register("banner")} />
                                </div>
                            </label>
                            <div className="p-4">
                                <div className="relative flex w-full">
                                    {/* <!-- Avatar --> */}
                                    <div style={{ marginTop: '-6rem' }} >
                                        <div style={{ height: '9rem', width: '9rem' }} className="md rounded-full relative avatar cursor-pointer">
                                            <img
                                                style={{ height: '9rem', width: '9rem' }}
                                                className="md rounded-full relative border-4 border-gray-900 opacity-80"
                                                src={user?.avatar}
                                                alt=""
                                            />
                                            <label className="flex justify-end my-[-30px] cursor-pointer">
                                                <IoCameraSharp size={35} className="text-black " fontSize="large" />
                                                <input id="upload" type="file" className="hidden" {...register("avatar")} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /** HASTA AQUI */}

                        <div className="">
                            <div className="">
                                <label className="text-md text-gray-600">Name</label>
                                <input
                                    type="text"
                                    {...register("name", { minLength: 4 })}
                                    name="name"
                                    defaultValue={user?.name}
                                    className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                                />
                                {errors.name?.type === 'minLength' && <span style={{ color: "red" }}>Very short name, minimum 4 letters</span>}
                            </div>
                            <div className="">
                                <label className="text-md text-gray-600">Lastname</label>
                                <input
                                    type="text"
                                    {...register("lastname", { minLength: 4 })}
                                    name="lastname"
                                    defaultValue={user?.lastname}
                                    className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                                />
                                {errors.name?.type === 'minLength' && <span style={{ color: "red" }}>Very short lastname, minimum 4 letters</span>}

                            </div>
                            <div className="">
                                <label className="text-md text-gray-600">Biography</label>
                                <textarea
                                    {...register("biography", { minLength: 10, maxLength: 150 })}
                                    name="biography"
                                    defaultValue={userData?.biography?.toString()}
                                    className="p-6 w-full border-2 border-gray-300 mb-5 rounded-md" /
                                >
                                {errors.name?.type === 'minLength' && <span style={{ color: "red" }}>Very short bio, minimum 10 letters</span>}
                                {errors.name?.type === 'maxLength' && <span style={{ color: "red" }}>Very large bio, maximun 150 letters</span>}
                            </div>
                            <div className="">
                                <label className="text-md text-gray-600">Location</label>
                                <input
                                    type="text"
                                    {...register("location", { minLength: 5 })}
                                    name="location"
                                    defaultValue={userData?.location?.toString()}
                                    className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                                />
                                {errors.name?.type === 'minLength' && <span style={{ color: "red" }}>Very short location, minimum 5 letters</span>}
                            </div>
                            <div className="">
                                <label className="text-md text-gray-600">Birthdate</label>
                                <input
                                    type="date"
                                    {...register("birthdate", { valueAsDate: true })}
                                    name="birthdate"
                                    defaultValue={fixBirthdate(userData?.birthdate!).toString()}
                                    className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                                />
                            </div>
                        </div>

                    </form>
                </div>
                {/* <ModalImage showModalImage={isSideModalUserImage} userData={userData!} typeChange={typeChange} /> */}
            </div>
        </div>

    )
}

