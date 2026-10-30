import { useForm } from 'react-hook-form'
import { type ClientCreate } from '../shared/api/client'
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';
interface ClientFormProps {
    onSubmitData: (data: ClientCreate) => void;
    onCancel: () => void;
    initialData?: ClientCreate & { id?: string };
}

export function ClientForm({
    onSubmitData,
    onCancel,
    initialData,
}: ClientFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ClientCreate>({ defaultValues: initialData });
    return (

        <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
            <Input<ClientCreate>
                label='Фамилия клиента'
                required='Фамилия обязательна для заполнения'
                placeholder='Иванов'
                nameField='last_name'
                register={register}
                errors={errors}
            />
            <Input<ClientCreate>
                label='Имя клиента'
                required='Имя обязательно для заполнения'
                placeholder='Иван'
                nameField='first_name'
                register={register}
                errors={errors}
            />
            <Input<ClientCreate>
                label='Номер телефона'
                required='Телефон обязателен'
                placeholder='+7(900)-000-00-00'
                nameField='phone'
                register={register}
                errors={errors}
                patternRule={{
                    value: /^(?:\+7|8)[\s\-]?(?:\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
                    message: 'Некорректный формат'
                }}
            />
            <Input<ClientCreate>
                label='Telegram'
                required='Телеграм обязателен'
                placeholder='@name'
                nameField='telegram_username'
                register={register}
                errors={errors}
            />
            <Input<ClientCreate>
                label='Заметка'
                placeholder='Задерживает оплату'
                nameField='notes'
                register={register}
                errors={errors}
            />
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button text='Отмена' variant='light' onClick={onCancel} />
                <Button
                    text="Сохранить"
                    variant="dark"
                    type="submit"
                />
            </div>
        </form>
    );
}