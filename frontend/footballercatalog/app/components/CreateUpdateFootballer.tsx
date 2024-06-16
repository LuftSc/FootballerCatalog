import { AutoComplete, Button, Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { Footballer } from "../Models/Footballer";
import { FootballerRequest, getAllFootballers } from "../services/footballers";
import { Footballers } from "./footballers";

interface Props {
    mode: Mode;
    values: Footballer;
    isModalOpen: boolean;
    footballers: Footballer[];
    handleCancel: () => void;
    handleCreate: (request: FootballerRequest) => void;
    handleUpdate?: (id: string, request: FootballerRequest) => void;
}

export enum Mode{
    Create,
    Edit
}

const regexpForDataValidation = /(19|20)\d{2}-(0[1-9]|1[0,1,2])-(0[1-9]|[12][0-9]|3[01])/;
const regexpForLettersValidation = /^([A-Za-zА-яЁё]+)$/;

export const CreateUpdateFootballer = ({
    mode,
    values,
    isModalOpen,
    footballers,
    handleCancel,
    handleCreate,
    handleUpdate
} : Props) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [team, setTeam] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    useEffect(() => {
        setFirstName(values.firstName);
        setLastName(values.lastName);
        setGender(values.gender);
        setBirthDate(values.birthDate);
        setTeam(values.team);
        setCountry(values.country);
    }, [values])

    const allIdWarningTexts:string[] = ["firstName", "lastName", 
    "gender", "birthDate", "team", "country"];
    
    const handleOnOk = async () => {
        const footballerRequest = {firstName,lastName,gender,birthDate,team,country};
        const invalidFields = getInvalidFields();
        if (invalidFields.length == 0) {
            setColorOnIdFields("black");
            if (mode === Mode.Create) {
                handleCreate(footballerRequest);
            } else if (handleUpdate !== undefined) {
                handleUpdate(values.id, footballerRequest);
            }
        } else {
            setColorOnIdFields("black");
            setColorOnIdFields("red", invalidFields);
        }
        
    }
    
    const getInvalidFields = () => {
        let invalidFields:string[] = ["firstName", "lastName", 
        "gender", "birthDate", "team", "country"];
        
        checkWithRegexp(invalidFields, firstName, regexpForLettersValidation, "firstName"); 
        checkWithRegexp(invalidFields, lastName, regexpForLettersValidation, "lastName"); 
        checkWithRegexp(invalidFields, birthDate, regexpForDataValidation, "birthDate"); 
        checkOnEmpty(invalidFields, gender, "gender");
        checkOnEmpty(invalidFields, team, "team");
        checkOnEmpty(invalidFields, country, "country");

        return invalidFields;
    }
    const setColorOnIdFields = (color: string, idFields?: string[]) => {
        if (idFields === undefined) idFields = allIdWarningTexts
        idFields.forEach((id) => {
            let element = document.getElementById(id);
            if (element !== null) {
                element.style.color = color;
            }
        })
    }
    
    const checkOnEmpty = (arr:string[], valueToCheck:string, fieldId:string) => {
        if (valueToCheck.length > 0) deleteItem(arr,fieldId);
    }
    const checkWithRegexp = (arr:string[], valueToCheck:string, regexp:RegExp, fieldId: string) => {
        if (regexp.test(valueToCheck)) deleteItem(arr, fieldId);
    }
    function deleteItem(arr: string[], value: string) {
        const index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
    }

    const getCurrentTeams = (footballers: Footballer[]) => {
        let footballerTeams: string[] = []

        if (footballers !== undefined) {
            for(let i = 0; i < footballers.length; i++) {
                if (!footballerTeams.includes(footballers[i].team)) {
                    footballerTeams.push(footballers[i].team);
                }
            }
        }

        return footballerTeams.map((t) => {return {value: t}});
    }

    return (
        <Modal 
            title={mode === Mode.Create ? "Добавить футболиста" : "Изменить информацию о футболисте"}
            open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={() => {handleCancel(); setColorOnIdFields("black")}}
        >
            <div className="footballer_modal">
                <div>
                    <p id="firstName">Введите имя футболиста (только буквы, без других знаков)</p>
                    <Input
                        value={firstName}
                        onChange={((e: { target: { value: any; }; }) => setFirstName(e.target.value))}
                        placeholder={"Имя"}
                    />
                    <p id="lastName">Введите фамилию футболиста (только буквы, без других знаков)</p>
                    <Input
                        value={lastName}
                        onChange={((e: { target: { value: any; }; }) => setLastName(e.target.value))}
                        placeholder={"Фамилия"}
                    />
                </div>
                <div>
                    <p id="gender">Выберите пол футболиста</p>
                    <Radio.Group
                        onChange={((e: { target: { value: any; }; }) => setGender(e.target.value))}
                        value={gender}
                    >
                        <Radio value={"Мужской"}>Мужской</Radio>
                        <Radio value={"Женский"}>Женский</Radio>
                    </Radio.Group>
                </div>
                
                <div>
                    <p id="birthDate">Введите дату в формате ГГГГ-ММ-ДД</p>
                    <Input
                        value={birthDate}
                        onChange={((e: { target: { value: any; }; }) => setBirthDate(e.target.value))}
                        placeholder={"Дата рождения"}
                    />
                </div>
                <div>
                <p id="team">Выберите команду из списка или добавьте новую</p>
                    <div className="modal_dropDownList_team"  id="dropDownList">
                        <Select
                            value={team}
                            style={{ width: 250 }}
                            onChange={(value:string) => {
                                setTeam(value);
                            }}
                            options={getCurrentTeams(footballers)}
                        />
                        <Button 
                            type="primary"
                            size="middle"
                            onClick={() => {
                                setTeam("");
                                let inputField = document.getElementById("inputField");
                                if (inputField !== null) {
                                    inputField.style.visibility="visible";
                                }
                            }}
                        >
                            Новая команда 
                        </Button>
                    </div>
                    <div className="modal_inputField_team" id="inputField">
                        <Input
                            value={team}
                            style={{ width: 250 }}
                            onChange={((e: { target: { value: any; }; }) => setTeam(e.target.value))}
                        />
                        <Button 
                            type="primary"
                            size="middle"
                            onClick={() => {
                                let inputField = document.getElementById("inputField");
                                if (inputField !== null) {
                                    inputField.style.visibility="hidden";
                                }
                            }}
                        >
                            Выбрать существующую 
                        </Button>
                    </div>
                </div>
                <div>
                    <p id="country">Выберите страну из списка</p>
                    <Select
                        value={country}
                        style={{ width: 120 }}
                        onChange={(value:string) => setCountry(value)}
                        options={[
                            { value: 'Россия', label: 'Россия' },
                            { value: 'США', label: 'США' },
                            { value: 'Италия', label: 'Италия' },
                        ]}
                    />
                </div>
            </div>
        </Modal>

    )
};