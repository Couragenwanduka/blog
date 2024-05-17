import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed');
    }
};

const comparePassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Password comparison failed');
    }
};

export {
    hashPassword,
    comparePassword
};
