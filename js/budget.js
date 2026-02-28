/**
 * Go-Muktinath Budget Estimation Logic
 * ------------------------------------
 * FR-7: System shall display budget categories.
 * FR-8: System shall show approximate cost.
 */

function loadBudgetTable() {
    const container = document.getElementById('budget-table-container');
    if (!container) return;

    // Get translated categories, options, and notes
    const categories = i18n.t('budget.categories');
    const options = i18n.t('budget.options');
    const notes = i18n.t('budget.notes');

    const budgetData = [
        {
            category: categories.transport,
            options: [
                { name: options.localBus, cost: "NPR 1,500 - 2,500", note: notes.localBus },
                { name: options.sharedJeep, cost: "NPR 3,000 - 5,000", note: notes.sharedJeep },
                { name: options.flight, cost: "USD 100 - 125", note: notes.flight }
            ]
        },
        {
            category: categories.accommodation,
            options: [
                { name: options.teahouse, cost: "NPR 500 - 1,500", note: notes.teahouse },
                { name: options.hotel, cost: "NPR 3,000 - 7,000", note: notes.hotel }
            ]
        },
        {
            category: categories.food,
            options: [
                { name: options.meals, cost: "NPR 2,500 - 3,500", note: notes.meals },
                { name: options.water, cost: "NPR 100 - 250", note: notes.water }
            ]
        },
        {
            category: categories.permits,
            options: [
                { name: options.acap, cost: "NPR 3,000", note: notes.acap },
                { name: options.tims, cost: "NPR 2,000", note: notes.tims }
            ]
        }
    ];

    let html = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Option</th>
                        <th scope="col">Approx. Cost</th>
                        <th scope="col">Notes</th>
                    </tr>
                </thead>
                <tbody>
    `;

    budgetData.forEach(item => {
        item.options.forEach((opt, index) => {
            html += `
                <tr>
                    ${index === 0 ? `<td rowspan="${item.options.length}" class="fw-bold bg-light">${item.category}</td>` : ''}
                    <td>${opt.name}</td>
                    <td class="text-primary fw-bold">${opt.cost}</td>
                    <td class="text-muted small">${opt.note}</td>
                </tr>
            `;
        });
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}

// Load on initial page load
document.addEventListener('DOMContentLoaded', loadBudgetTable);
// Re‑load when language changes
window.addEventListener('languageChanged', loadBudgetTable);