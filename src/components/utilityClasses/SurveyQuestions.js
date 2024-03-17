
export const surveyQuestions = [
    {
        question: "How satisfied are you with our product?",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        isDescriptive: false,
        isNumeric: false,
    },
    {
        question: "What features would you like to see added to our service?",
        isDescriptive: true,
        isNumeric: false,
    },
    {
        question: "On a scale of 1 to 10, how likely are you to recommend our company to a friend or colleague?",
        isDescriptive: false,
        isNumeric: true,
    },
    {
        question: "Please share any additional comments or feedback.",
        isDescriptive: true,
        isNumeric: false,
    }
];
