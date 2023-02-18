import { useForm } from '@/context/form-context';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Success() {
  const { form } = useForm();
  return (
    <div className={inter.className}>
      <h1>Thanks for signing up to OneSpark</h1>
      <p>Here is your data:</p>

      {form.sections.map((section) => {
        return (
          <div key={section.sectionNumber}>
            <h3>Section number: {Number(section.sectionNumber) + 1}</h3>
            {JSON.stringify(section.answers)}
          </div>
        );
      })}
    </div>
  );
}
