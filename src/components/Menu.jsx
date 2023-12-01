import { useState } from "react";
import { FiSun } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { PiLockKeyFill } from "react-icons/pi";
export default function Menu() {
	const [isImportant, setIsImportant] = useState(false);
	const handleToggleImportant = () => {
		setIsImportant(!isImportant);
	};

	return (
		<>
			<div className="bg"></div>
			<div className="bg bg2"></div>
			<div className="bg bg3"></div>
			<div className="content"></div>
			<div className="Menu-wrapper">
				<div className="first-container">
					<h1>Menu</h1>
				</div>
				<div className="second-container">
					<h2>Tâches</h2>

					<div className="taches-menu">
						<div className="journée">
							<button className="todo-journée">
								<FiSun size={25} />
							</button>
							<p>Ma journée</p>
						</div>
						<div className="taches">
							<button
								className={`todo-important ${isImportant ? "important" : ""}`}
								onClick={handleToggleImportant}
							>
								<FaRegStar size={25} />
							</button>{" "}
							<p> Important</p>
						</div>
					</div>
				</div>

				<div className="third-container">
					<h2>Listes</h2>
					<div className="list-menu">
						<div className="personnel">
							<button className="todo-personnel">
								<PiLockKeyFill size={25} />
							</button>
							<p>Personnel</p>
						</div>
						<div className="travail">
							<button className="todo-travail">
								<MdWork size={25} />
							</button>
							<p>Travail</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
