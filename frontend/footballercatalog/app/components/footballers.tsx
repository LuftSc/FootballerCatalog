import Button from "antd/es/button/button"
import Card from "antd/es/card/Card"
import { Footballer } from "../Models/Footballer"
import { CardTitle } from "./Cardtitle"

interface Props {
    footballers: Footballer[];
    handleDelete: (id: string) => void;
    handleOpen: (footballer: Footballer) => void;
}

const getAllowedText = (text:string, allowedLength:number = 15):string => {
    if (text.length <= allowedLength) return text;
    else {
        return `${text.slice(0, allowedLength)}...`;
    }
}

export const Footballers = ({footballers, handleDelete, handleOpen}: Props) => {
    return (
        <div className="cards">
            {footballers.map((footballer: Footballer) => (
                <Card 
                    key={footballer.id} 
                    title={
                        <CardTitle 
                            firstName={getAllowedText(footballer.firstName)} 
                            lastName={getAllowedText(footballer.lastName)} 
                        />
                    }
                    bordered={false} 
                >
                    <div className="card_footballerInfo">
                        <div>Пол: {footballer.gender}</div>
                        <div>Дата рождения: {footballer.birthDate}</div>
                        <div>Команда: {getAllowedText(footballer.team, 45)}</div>
                        <div>Страна: {footballer.country}</div>
                    </div> 
                    
                    <div className="card_buttons">
                        <Button 
                            onClick={() => handleOpen(footballer)}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={() => handleDelete(footballer.id)}
                            danger
                        >
                            Удалить
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}