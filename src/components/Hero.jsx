import React from 'react';
import { FaFileWaveform } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="lora text-center py-1"
        >

            <div className='flex flex-row'>
                <FaFileWaveform className="text-3xl ml-5" />

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-2 ml-16
                     text-gray-200 decoration-from-font"
                >
                    DevAppendor
                </motion.h1>

            </div>


            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-2 font-semibold text-xl mt-5 text-gray-300"
            >
                The One-Stop Solution for Creating Forms
            </motion.h3>
        </motion.div>
    );
};

export default Hero;
