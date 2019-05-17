import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { noteService } from '@/Services';

import '@/Notes/Notes.css';
import { Note, AddNote, Paginator } from '@/Notes';

const Notes = () => {
    const [notes, setNotes] = useState(null);
    const [noteModalStatus, setNoteModalStatus] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [addModalStatus, setAddModalStatus] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentTag, setCurrentTag] = useState(null);

    useEffect(() => {
        noteService.getNotesByTag(activePage, currentTag).then(notes => {
            setNotes(notes.content);
            setPageCount(notes.totalPages);
        })
    }, [activePage, currentTag, noteModalStatus, addModalStatus]);

    const handleCardClick = (id) => {
        setNoteId(id)
        setNoteModalStatus(true);
    }

    const handleAddClick = () => {
        setAddModalStatus(true);
    }

    const handleTag = (tags) => {
        let result = [];
        for (const key of Object.keys(tags)) {
            let tag = tags[key].name.toLowerCase();
            result.push(
                <Badge  key={key} variant="secondary" className="mr-1" id={"badge-" + tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Badge>
            );
        }
        result.sort()
        return result;
    };

    const handleTagClick = (tag) => {
        setCurrentTag(tag);
    }

    const handleActive = (tag) => {
        if (tag === currentTag)
            return "active-tag";
    }

    return (
        <div className="container-fluid mt-3">
            <Helmet>
                <title>Woodpecker - Notes</title>
            </Helmet>
            <h4 className="page-header">Notes</h4>
            <Row>
                <Col>
                    <ul className="notes-nav">
                        <li className={handleActive(null)} onClick={() => handleTagClick(null)}>All</li>
                        <li className={handleActive("IMPORTANT")} onClick={() => handleTagClick("IMPORTANT")}>Important</li>
                        <li className={handleActive("WORK")} onClick={() => handleTagClick("WORK")}>Work</li>
                        <li className={handleActive("PERSONAL")} onClick={() => handleTagClick("PERSONAL")}>Personal</li>
                        <li className={handleActive("OTHER")} onClick={() => handleTagClick("OTHER")}>Other</li>
                    </ul>
                </Col>
                <Col>
                    <Button variant="outline-primary" className="float-right mr-4" onClick={handleAddClick}>Add Note</Button>
                </Col>
            </Row> 
            <Row className="mx-3 mt-3">
                <Col>
                    {notes &&
                        <CardColumns>
                            {notes.map(note => 
                                <Card onClick={() => handleCardClick(note.id)} key={note.id} className="notes-card h-100">
                                    <Card.Body>
                                        <Card.Title>{note.title}</Card.Title>
                                        <Card.Text>
                                            <span className="d-block mb-2">{note.description}</span>
                                            {handleTag(note.tags)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        
                        </CardColumns>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <Paginator activePage={activePage} setActivePage={setActivePage} pageCount={pageCount} />
                </Col>
            </Row>
            <Note noteModalStatus={noteModalStatus} setNoteModalStatus={setNoteModalStatus} noteId={noteId} setNoteId={setNoteId} />
            <AddNote addModalStatus={addModalStatus} setAddModalStatus={setAddModalStatus} />
        </div>
    )
}

export { Notes };