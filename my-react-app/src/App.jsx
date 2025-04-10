import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./App.css";

function App() {
	const [currentData, setCurrentData] = useState("No result");
	const [scanHistory, setScanHistory] = useState([]);

	const beepSound = new Audio("../beep-313342.mp3");

	const handleScan = (err, result) => {
		if (result) {
			setCurrentData(result.text);
			setScanHistory(prevHistory => [...prevHistory, result.text]);

			beepSound.play();
			toast.success(`Product scanned: ${result.text}`);
		} else {
			setCurrentData("No result");
		}
	};
	return (
		<>
			<div className="box">
				<Toaster
					position="top-right"
					reverseOrder={false}
				/>
				<div className="title">Scanner</div>
				<div className="scan">
					<BarcodeScannerComponent
						width={500}
						height={500}
						onUpdate={handleScan}
						delay={1500}
					/>
				</div>
				<p>Scanned Data: {currentData}</p>
				<h2>Scan History</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Scanned Result</th>
						</tr>
					</thead>
					<tbody>
						{scanHistory.map((result, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{result}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
