const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Replace with your info
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Input must be an array" });
        }

        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let concatLetters = "";

        data.forEach(item => {
            const strItem = String(item);

            if (/^\d+$/.test(strItem)) { // number
                const num = parseInt(strItem);
                sum += num;
                if (num % 2 === 0) even_numbers.push(strItem);
                else odd_numbers.push(strItem);
            } else if (/^[a-zA-Z]+$/.test(strItem)) { // alphabet string
                alphabets.push(strItem.toUpperCase());
                concatLetters += strItem;
            } else { // special character
                special_characters.push(strItem);
            }
        });

        // Generate concat_string in reverse order with alternating caps
        const reversed = concatLetters.split("").reverse();
        let concat_string = "";
        reversed.forEach((char, index) => {
            concat_string += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        });

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            even_numbers,
            odd_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
