export function id(): string {
	const id = 'yxxxxxxxxxxxxxxxxx'
		.replace(/y/g, () => (~~(Math.random() * 9) + 1).toString())
		.replace(/x/g, () => (~~(Math.random() * 10)).toString());
	return id;
}
