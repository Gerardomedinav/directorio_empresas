import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Ingresar" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">¡Bienvenido de nuevo!</h2>
                <p className="text-slate-600 text-sm mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Contraseña" className="text-slate-700 font-semibold" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full bg-white/50 border-white/20 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-slate-600">Recordarme</span>
                    </label>

                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm text-blue-600 hover:underline font-medium">
                            ¿Olvidaste tu clave?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center bg-blue-600 hover:bg-blue-700 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all text-lg font-bold" 
                        disabled={processing}
                    >
                        Ingresar al Portal
                    </PrimaryButton>
                </div>
                
                <p className="text-center text-sm text-slate-600 mt-6">
                    ¿No tienes cuenta?{' '}
                    <Link href={route('register')} className="text-blue-600 font-bold hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}