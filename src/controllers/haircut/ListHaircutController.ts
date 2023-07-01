import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListHaircutService";

class ListHaircutControler{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const status = req.query.status as string;

        const listHaircuts = new ListHaircutService();

        const haircuts = await listHaircuts.execute({
            user_id,
            status
        })

        return res.json(haircuts)

    }
}

export {ListHaircutControler}