import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro de Emprendedor" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Crea tu cuenta</h2>
                <p className="text-slate-600 text-sm mt-1">Únete al directorio de empresas formoseñas</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Nombre */}
                <div>
                    <InputLabel htmlFor="name" value="Nombre Completo" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 rounded-xl"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 rounded-xl"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 rounded-xl"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 rounded-xl"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="pt-4 flex flex-col gap-4 items-center">
                    <PrimaryButton 
                        className="w-full justify-center bg-blue-600 hover:bg-blue-700 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all text-lg font-bold" 
                        disabled={processing}
                    >
                        Comenzar Ahora
                    </PrimaryButton>

                    <Link
                        href={route('login')}
                        className="text-sm text-slate-600 hover:text-blue-600 font-medium transition"
                    >
                        ¿Ya tienes cuenta? <span className="font-bold">Inicia sesión</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}