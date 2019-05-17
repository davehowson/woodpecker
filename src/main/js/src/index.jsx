import React from 'react';
import { render } from 'react-dom';

import '@/index.css'

import { Routes } from '@/Utilities';

render(
    <Routes />,
    document.getElementById('app')
);