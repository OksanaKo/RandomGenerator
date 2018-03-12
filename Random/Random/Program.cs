using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace RandNumber
{
    class Program
    {
        class Range
        {
            public double A
            {
                get;
                set;
            }

            public double B
            {
                get;
                set;
            }

            public Range(double a, double b)
            {
                A = a;
                B = b;
            }
        }



        static List<Range> makeRange(double[,] table) //будуємо Ліст діапазонів
        {
            List<Range> ranges = new List<Range>();

            ranges.Add(new Range(0, table[1, 0]));
            for (int i = 1; i < table.GetLength(1); i++)
            {
                ranges.Add(new Range(ranges[i - 1].B, ranges[i - 1].B + table[1, i]));
            }
            for (int i = 0; i < table.GetLength(1); i++)
            {
               // Console.WriteLine(ranges[i].A + " - " + ranges[i].B);
            }
            Console.WriteLine();
            return ranges;
        }

        static string modelDicrete(double[,] table, List<Range> ranges, int count)
        {
            double progres = 0;
            double progresStep = (double)100 / count;
            string massResult = "";
            double[] massRes = new double[count];
            double number;
            int countT = 0;
            Random rand = new Random();
            for (int j = 0; j < count; j++)
            {
                number = rand.NextDouble();

                int i = 0;
                foreach (var item in ranges)
                {
                    if (number >= item.A && number <= item.B)
                    {
                        //massResult += table[0, i] + " ";
                        massRes[j] = table[0, i];
                        countT++;
                    }
                    i++;
                }
                progres += progresStep;
               // progres = Math.Round(progres, 2);
                Console.WriteLine(Math.Round(progres, 1).ToString());
                Thread.Sleep(10);
            }

            for (int i = 0; i < count; i++)
            {
                massResult += massRes[i] + " ";
            }

            return massResult;
        }

        static void Main(string[] args)
        {
            const int n = 7;
            double[,] table = new double[2, n] { { 57, 1, 41, 28, 17, 20, 99 }, { 0.02, 0.05, 0.1, 0.28, 0.23, 0.22, 0.1 } };
            List<Range> ranges = makeRange(table);

            int count = Int32.Parse(args[0]);
            string result = modelDicrete(table, ranges, count);

            Console.WriteLine("result"+result);
        }
    }
}
