import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Donation} from '../../types/donation';
import {Box, Button, Typography} from '@mui/material';
import {flexGridStyle} from '../../styles/common';
import Loading from '../UI/Loading';
import Donate from '../Donate';
import NothingYet from '../UI/NothingYet';


const DonationHistory = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [donation, setDonation] = useState<Donation[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await window.contract.findPostDonations({postId: Number(id)});
                setDonation(data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                isLoading ?
                    <Loading/>
                    :
                    <Box sx={flexGridStyle}>
                        <Button onClick={() => navigate(-1)} fullWidth>Back</Button>
                        <Typography marginBottom={2} variant='h4' align='center'>DonationHistory</Typography>
                        {
                            donation.length ?
                                donation.map((el, i) => <Donate key={i} donate={el}/>)
                                :
                                <NothingYet/>
                        }
                    </Box>
            }
        </>
    );
};

export default DonationHistory;