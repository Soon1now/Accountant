import { useForm } from 'react-hook-form'
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';
import type { ScheduleCreate } from '../shared/api/schedule';
import SelectInput from '../shared/ui/SelectInput';
import useOptions from '../app/useOptions';
import { useClient } from '../entities/clientContext';
import { useService } from '../entities/serviceContext';

interface ScheduleFormProps {
    onSubmitData: (data: ScheduleCreate) => void;
    onCancel: () => void;
    initialData?: ScheduleCreate & { id?: string };
}

export function ScheduleForm({
    onSubmitData,
    onCancel,
    initialData,
}: ScheduleFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ScheduleCreate>({ defaultValues: initialData });
    const { filteredClients } = useClient();
    const { services } = useService();

    const clientsList = useOptions(filteredClients, 'client');
    const servicesList = useOptions(services, 'service');

    return (

        <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
            <Input<ScheduleCreate>
                label='Описание события'
                required='Описание обязательно для заполнения'
                placeholder='Покупка подписки'
                nameField='notes'
                register={register}
                errors={errors}
            />
            <Input<ScheduleCreate>
                label="Дата"
                nameField="date"
                type="date"
                register={register}
                errors={errors}
                required="Укажите дату события"
            />
            <div className='flex gap-5'>
                <Input<ScheduleCreate>
                    label="Начало"
                    nameField="start_time"
                    type="time"
                    register={register}
                    errors={errors}
                    required="Укажите время начала"
                />
                <Input<ScheduleCreate>
                    label="Конец"
                    nameField="end_time"
                    type="time"
                    register={register}
                    errors={errors}
                    required="Укажите время конца"
                />
            </div>
            <Input<ScheduleCreate>
                label='Стоимость'
                required='Стоимость обязательна для заполнения'
                placeholder='1.500'
                nameField='price_at_event'
                register={register}
                errors={errors}
                type='number'
            />
            <SelectInput<ScheduleCreate>
                label='Клиент'
                required='Выбор обязателен'
                placeholder='Выбирите из списка'
                nameField='client_id'
                register={register}
                errors={errors}
                options={clientsList}
            />
            <SelectInput<ScheduleCreate>
                label='Сервис'
                required='Выбор обязателен'
                placeholder='Выбирите из списка'
                nameField='service_id'
                register={register}
                errors={errors}
                options={servicesList}
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