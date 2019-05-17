import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { noteService } from "@/Services";

import '@/Dashboard/NotesCarousel.css';

const NotesCarousel = () => {
    const [notes, setNotes] = useState(null);
    useEffect(() => {
        noteService.getNotesByTag(0, "IMPORTANT").then(notes => {
            setNotes(notes.content);
        });
    }, []);
    

    return (
        <>
            {notes &&
                <Carousel 
                    className="note-carousel" 
                    interval={10000}
                    nextIcon={<FontAwesomeIcon icon="chevron-right" />}
                    prevIcon={<FontAwesomeIcon icon="chevron-left" />}
                >
                    {notes.map(note => 
                        <Carousel.Item key={note.id}>
                            <div className="note-container d-flex justify-content-center align-items-center flex-column">
                                <h3 className="mb-3">{note.title}</h3>
                                <p>
                                    {note.description}
                                </p>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            }
        </>
    );
};

export { NotesCarousel };
