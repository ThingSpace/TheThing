import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const LoadingStyles = cva(
    'h-4 w-screen animate-pulse-slow bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]',
    {
        variants: {
            styles: {
                normal: 'from-gray-700 via-gray-900 to-black',
                opposite: 'from-gray-200 via-white to-white',
            },
        },
        defaultVariants: {
            styles: 'normal',
        },
    },
);

export interface LoadingProps extends VariantProps<typeof LoadingStyles> {
    styles?: 'normal' | 'opposite';
}

export const Loading: React.FC<LoadingProps> = ({ ...props }) => {
    return (
        <motion.div
            className="absolute left-0 top-0 flex w-full"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}>
            <div className={LoadingStyles(props)}></div>
        </motion.div>
    );
};

const MarshmallowMellow: React.FC = () => (
    <motion.div
        className="relative flex items-center justify-center"
        animate={{
            x: [0, 100, 0],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        <motion.div
            className="relative"
            animate={{
                rotate: [0, 360],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {/* Mellow's head using the provided image */}
            <div className="w-16 h-16 relative">
                <img 
                    src="/mellow.png" 
                    alt="Mellow the Marshmallow" 
                    className="w-full h-full object-contain"
                />
            </div>
        </motion.div>
        {/* Rolling motion lines */}
        <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
        </motion.div>
    </motion.div>
);

export const FullScreenLoading: React.FC = () => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-opacity-[10%] bg-clouds-pattern">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
                className="flex flex-col items-center gap-6"
            >
                <MarshmallowMellow />
                <motion.div 
                    className="text-xl font-mono text-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    Mellow is Loading...
                </motion.div>
            </motion.div>
        </div>
    );
};