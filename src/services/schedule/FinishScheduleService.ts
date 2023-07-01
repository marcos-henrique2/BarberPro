import prismaClient from "../../prisma";

interface FinishSchedule{
    schedule_id: string;
    user_id: string;
}

class FinishScheduleService{
    async execute({schedule_id, user_id}: FinishSchedule){

        if(schedule_id === '' || user_id === ''){
            throw new Error('Erro')
        }

        try{

            const belongsToUser = await prismaClient.service.findFirst({
                where:{
                    id: schedule_id,
                    user_id: user_id
                }
            })

            if(!belongsToUser){
                throw new Error("Não autorizado")
            }

            await prismaClient.service.delete({
                where:{
                    id: schedule_id
                }
            })

            return {message: "Finalizado com sucesso!"}

        }catch(err){
            console.log(err);
            throw new Error(err);
        }

    }
}

export {FinishScheduleService}