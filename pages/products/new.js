import Layout from '@/Components/Layout';
import Producteditform from '@/Components/productEditForm';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react';

const New = () => {
    
   return (
    <Layout>
        <Producteditform />
    </Layout>
   )
};

export default New;
