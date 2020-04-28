import { NeuralNetwork } from "brain.js";

const textToPredict = "MONDAY";

interface HospitalDoctor {
  day: string;
  name: string;
}

interface NeuralNetworkTrainingData {
  input: {
    [key: string]: number;
  };
  output: {
    [key: string]: number;
  };
}

const hospitalDoctors: HospitalDoctor[] = [
  { day: "Monday", name: "dr. Twinda Rarasati" },
  { day: "Tuesday", name: "dr. Boyke Anugrah" },
  { day: "Wednesday", name: "dr. Twindy Rarasati" },
  { day: "Thursday", name: "dr. Reinita Arlin" },
  { day: "Friday", name: "dr. Reisa Broto Asmoro" },
  { day: "Saturday", name: "dr. Tirta" },
  { day: "Sunday", name: "dr. Indah Kusuma" },
];

const trainingDataNormalCase: NeuralNetworkTrainingData[] = hospitalDoctors.map(
  (item) => ({ input: { [item.day]: 1 }, output: { [item.name]: 1 } })
);

const trainingDataLowerCase: NeuralNetworkTrainingData[] = hospitalDoctors.map(
  (item) => ({
    input: { [item.day.toLowerCase()]: 1 },
    output: { [item.name]: 1 },
  })
);

const trainingDataUppercase: NeuralNetworkTrainingData[] = hospitalDoctors.map(
  (item) => ({
    input: { [item.day.toUpperCase()]: 1 },
    output: { [item.name]: 1 },
  })
);

const trainingData = [
  ...trainingDataNormalCase,
  ...trainingDataLowerCase,
  ...trainingDataUppercase,
];

const net = new NeuralNetwork({
  hiddenLayers: [3],
});

const stat = net.train(trainingData);
console.log("Stat: ", stat);

console.log("Predict: ", textToPredict);
const predict = net.run<{ [key: string]: number }, { [key: string]: number }>({
  [textToPredict]: 1,
});

const predictEntries = Object.entries(predict);
const predictOrder = predictEntries.sort((a, b) => b[1] - a[1]);

console.log("Results: ", predictOrder[0][0]);
