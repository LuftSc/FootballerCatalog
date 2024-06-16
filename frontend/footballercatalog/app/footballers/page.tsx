"use client";

import { Footballers } from "../components/footballers";
import { useEffect, useState } from "react";
import { createFootballer, deleteFootballer, FootballerRequest, getAllFootballers, updateFootballer } from "../services/footballers"
import { Footballer } from "../Models/Footballer";
import Title from "antd/es/skeleton/Title";
import { CreateUpdateFootballer, Mode } from "../components/CreateUpdateFootballer";

export default function FootballersPage() {
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
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getFootballers = async () => {
            const footballers = await getAllFootballers();
            setLoading(false);
            setFootballers(footballers);
        }

        getFootballers();
    }, [])

    const handleCreateFootballer = async (request: FootballerRequest) => {
        await createFootballer(request);
        closeModal();

        const footballers = await getAllFootballers();
        setFootballers(footballers);
    }

    const handleUpdateFootballer = async (id: string, request: FootballerRequest) => {
        await updateFootballer(id, request);
        closeModal();

        const footballers = await getAllFootballers();
        setFootballers(footballers);
    }

    const handleDeleteFootballer = async (id: string) => {
        await deleteFootballer(id);
        closeModal();

        const footballers = await getAllFootballers();
        setFootballers(footballers);
    }

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    }

    const openEditModal = (footballer: Footballer) => {
        setMode(Mode.Edit);
        setValues(footballer);
        setIsModalOpen(true);
    }
    
    return (
        <div>
            <CreateUpdateFootballer 
                mode={mode} 
                values={values} 
                isModalOpen={isModalOpen}
                footballers={footballers}
                handleCreate={handleCreateFootballer}
                handleUpdate={handleUpdateFootballer}
                handleCancel={closeModal}
            />

            {loading ? 
                (<h1>Загрузка футболистов...</h1> ) 
                    : <Footballers 
                        footballers={footballers} 
                        handleOpen={openEditModal} 
                        handleDelete={handleDeleteFootballer}
                    />
            }
        </div>
    )
}