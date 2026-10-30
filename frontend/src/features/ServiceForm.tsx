import { useForm } from 'react-hook-form'
import { type ServiceCreate } from '../shared/api/service'
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';

interface ServiceFormProps {
    onSubmitData: (data: ServiceCreate) => void;
    onCancel: () => void;
}

export function ServiceForm({
    onSubmitData,
    onCancel
}: ServiceFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ServiceCreate>();
    return (
        <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
            <Input<ServiceCreate>
                label='Название'
                required='Название обязательно для заполнения'
                placeholder='Подписка'
                nameField='name'
                register={register}
                errors={errors}
            />
            <Input<ServiceCreate>
                label='Описание'
                placeholder='Активна до декабря'
                nameField='description'
                register={register}
                errors={errors}
            />
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Цвет метки
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        {...register('color', { required: 'Выберите цвет' })}
                        className="w-12 h-10 p-1 bg-white border border-slate-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-500">Нажмите, чтобы выбрать цвет рамки</span>
                </div>
                {errors.color && (
                    <span className="text-xs text-red-500 mt-1 block">{(errors.color as any).message}</span>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button text='Отмена' variant='light' onClick={onCancel} />
                <Button text='Сохранить' variant='dark' type='submit' />
            </div>
        </form>
    );
}