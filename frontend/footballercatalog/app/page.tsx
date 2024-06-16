"use client"

import Button from "antd/es/button";
import { message } from 'antd';
import { useState } from "react";
import { CreateUpdateFootballer, Mode } from "./components/CreateUpdateFootballer";
import { Footballer } from "./Models/Footballer";
import { createFootballer, FootballerRequest, getAllFootballers, updateFootballer } from "./services/footballers";

export default function Home() {
  const defaultValues = {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    team: "",
    country: ""
} as Footballer;
  
  const [values, setValues] = useState<Footballer>(defaultValues)
  const [footballers, setFootballers] = useState<Footballer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);

  const [messageApi, contextHolder] = message.useMessage();

  const handleCreateFootballer = async (request: FootballerRequest) => {
    await createFootballer(request);
    closeModal();

    reloadAllFootballers();
    successMessage();
  }

  const openModal = () => {
    setMode(Mode.Create);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setValues(defaultValues);
    setIsModalOpen(false);
  }

  const reloadAllFootballers = async () => {
    const footballers = await getAllFootballers();
    setFootballers(footballers);
  }

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Футболист был успешно добавлен!",
    });
  };

  return (
    <div className="home_element">
      {contextHolder}
      <h1>Каталог футболистов</h1>
      <p className="home_text">Чтобы добавить нового футболиста нажмите на кнопку</p>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          openModal();
          reloadAllFootballers();
        }}
      >
        Добавить футболиста
      </Button>
      <CreateUpdateFootballer 
        mode={mode} 
        values={values} 
        isModalOpen={isModalOpen}
        footballers={footballers}
        handleCreate={handleCreateFootballer}
        handleCancel={closeModal}
      />
    </div>
  )
}
