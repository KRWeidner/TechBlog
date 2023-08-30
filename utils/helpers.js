module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    get_emoji: () => {
        let quotePic = "💬";
        return `<span for="img" aria-label="book">${quotePic}</span>`;
      },
};
