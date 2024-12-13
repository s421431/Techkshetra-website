'use client'

import { Box, Typography, Stack, Container, Button, useTheme } from "@mui/material";
import {useRouter} from "next/navigation";
import { motion } from 'framer-motion';
import imageKitLoader from "@/libs/imagekitloader";
import Image from "next/image";

export default function Header() {

    const router = useRouter();
    const theme = useTheme();

    return(
        <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id='home' 
        sx={{
            width: "100%", 
            height: "100vh", 
            display:'flex', 
            alignItems: 'center', 
            justifyContent:'center',
            backgroundColor: 'transparent'
            }}
        >
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Stack spacing={2} useFlexGap sx={{textAlign: 'center'}}>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex', 
                                flexDirection: 'column',
                                gap: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box 
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    border: `2px solid ${theme.palette.primary.main}`,
                                }}
                            >
                            <Image
                                loader={imageKitLoader}
                                src="/logos/collegelogo"
                                alt="B. K. Birla College Logo"
                                layout="fill"
                                objectFit="cover"
                            />
                            </Box>
                            <Typography variant='h4'>
                            B. K. Birla College of Arts, Science & Commerce
                            </Typography>
                        </Box>
                        <Typography variant='subtitle2' color={'textSecondary'}>
                        presents
                        </Typography>
                    </Box>
                    <Box my={{xs: 3, sm: 4}}>
                        <Typography variant='h1' >
                            TechKshetra
                        </Typography> 
                        <Typography variant='subtitle1'>
                            A CS and IT club of technology, innovation and more...
                        </Typography> 
                    </Box>  
                    <Box>
                        <Button variant="contained" onClick={() => router.push('/aboutus')} >
                            Know More
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}