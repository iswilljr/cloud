export const write = process.stdout.write.bind(process.stdout);

export const clearAndWrite = (text: string) => write(`\x1Bc${text}`);

interface PromptOptions {
  validate: (data: string) => boolean | Promise<boolean>;
  validateErrorMsg?: string;
  noDataMsg?: string;
}

export const prompt = (text: string, { validate, validateErrorMsg, noDataMsg }: PromptOptions): Promise<string> => {
  return new Promise((resolve) => {
    const handler = async (d: Buffer) => {
      const data = d.toString().trim();
      if (!data.length) return write(noDataMsg || text);
      if (await validate(data)) {
        resolve(data);
        process.stdin.emit("end");
        process.stdin.removeListener("data", handler);
      } else write(validateErrorMsg || text);
    };
    write(text);
    process.stdin.on("data", handler);
  });
};
